import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateEnquiry, createEnquiryEmail, createEnquiryWhatsApp } from '../src/shared/lib/enquiry.ts';

const valid = { name: 'Test Parent', phone: '9876543210', grade: '6', region: 'Ludhiana', city: '', interest: 'Boarding admissions', consent: true, website: '' };
test('normalizes Indian international and spaced phone numbers', () => {
  for (const phone of ['+91 98765 43210', '919876543210', '(98765) 43210']) {
    assert.equal(validateEnquiry({ ...valid, phone }).data.phone, '9876543210');
  }
});
test('rejects missing consent and ineligible class', () => {
  const result = validateEnquiry({ ...valid, grade: '2', consent: false });
  assert.ok(result.errors.grade);
  assert.ok(result.errors.consent);
  assert.equal(result.data, undefined);
});
test('rejects malformed phones, unknown regions and bot submissions', () => {
  assert.ok(validateEnquiry({ ...valid, phone: '1234567890' }).errors.phone);
  assert.ok(validateEnquiry({ ...valid, region: 'unknown' }).errors.region);
  assert.ok(validateEnquiry({ ...valid, website: 'bot' }).errors.form);
  assert.ok(validateEnquiry(null).errors.form);
});
test('accepts only the Punjab admission cities for enquiries and drive registrations', () => {
  for (const city of ['Ludhiana', 'Jalandhar', 'Amritsar', 'Bathinda', 'Moga', 'Pathankot', 'Firozpur', 'Fazilka', 'Gurdaspur', 'Tarn Taran', 'Hoshiarpur', 'Mansa', 'Phagwara', 'Sangrur']) {
    assert.ok(validateEnquiry({ ...valid, region: city, drive: city }).data, city);
  }
  for (const city of ['Chandigarh', 'Patiala', 'Mohali', 'Other', 'Guwahati', 'Siliguri', 'Kolkata']) {
    const result = validateEnquiry({ ...valid, region: city, drive: city, city: 'Ludhiana' });
    assert.ok(result.errors.region, city);
    assert.ok(result.errors.drive, city);
  }
});
test('prepares an encoded draft addressed only to school admissions', () => {
  const url = new URL(createEnquiryEmail({ ...valid, name: 'Parent & Guardian' }));
  assert.equal(url.pathname, 'admissions@doonglobalschool.edu.in');
  assert.match(url.searchParams.get('body'), /Parent & Guardian/);
  assert.match(url.searchParams.get('body'), /Class|class/);
  assert.equal(url.searchParams.has('cc'), false);
});
test('accepts an optional admission drive city and rejects unknown ones', () => {
  assert.equal(validateEnquiry(valid).data.drive, '');
  assert.equal(validateEnquiry({ ...valid, drive: 'Ludhiana' }).data.drive, 'Ludhiana');
  assert.ok(validateEnquiry({ ...valid, drive: 'Guwahati' }).errors.drive);
});
test('names the admission drive city in the email draft', () => {
  const url = new URL(createEnquiryEmail({ ...valid, drive: 'Ludhiana' }));
  assert.match(url.searchParams.get('subject'), /admission drive · Ludhiana/);
  assert.match(url.searchParams.get('body'), /Admission drive: Ludhiana/);
  assert.doesNotMatch(new URL(createEnquiryEmail({ ...valid, drive: '' })).searchParams.get('body'), /Admission drive/);
});
test('prepares a WhatsApp chat with admissions carrying the same enquiry text', () => {
  const url = new URL(createEnquiryWhatsApp({ ...valid, name: 'Parent & Guardian', drive: 'Ludhiana' }));
  assert.equal(url.origin + url.pathname, 'https://wa.me/918650728951');
  const text = url.searchParams.get('text');
  assert.match(text, /Parent & Guardian/);
  assert.ok(text.includes('Mobile: +91 9876543210'));
  assert.match(text, /Admission drive: Ludhiana/);
  assert.equal(text, new URL(createEnquiryEmail({ ...valid, name: 'Parent & Guardian', drive: 'Ludhiana' })).searchParams.get('body'));
});
