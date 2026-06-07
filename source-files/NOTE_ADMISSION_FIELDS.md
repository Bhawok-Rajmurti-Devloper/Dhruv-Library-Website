Added fields to Admission form:

- father's name: fatherName
- gender: gender (Male/Female/Other)
- qualification: qualification
- address: address

These fields are included in EmailJS template params with keys: fatherName, gender, qualification, address.

If you want the Certificate page's "Apply now" to prefill any of these fields (for example prefill course or name), tell me and I will wire the link to include hash/query params and read them in Admission component.