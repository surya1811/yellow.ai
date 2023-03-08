const Contact = require('../models/Contact');

// GET /api/contacts
exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ user: req.user._id });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

// POST /api/contacts
exports.createContact = async (req, res, next) => {
  try {
    const contact = new Contact({ ...req.body, user: req.user._id });
    const savedContact = await contact.save();
    res.json(savedContact);
  } catch (error) {
    next(error);
  }
};

// PUT /api/contacts/:id
exports.updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.user._id });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    Object.assign(contact, req.body);
    const savedContact = await contact.save();
    res.json(savedContact);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/contacts/:id
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.user._id });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    await contact.remove();
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    next(error);
  }
};
