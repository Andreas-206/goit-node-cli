import path from 'node:path'
import * as fs from 'node:fs/promises'
import crypto from 'node:crypto'

const contactsPath = path.resolve('db', 'contacts.json')

async function listContacts() {
	const data = await fs.readFile(contactsPath, { encoding: 'utf-8' })

	return JSON.parse(data)
}

function writeContacts(contacts) {
	return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2))
}

async function getContactById(contactId) {
	const contacts = await listContacts()

	const contact = contact.find(contact => contact.id === id)

	if (typeof contact === 'undefined') {
		return null
	}

	return contact
}

async function removeContact(contactId) {
	const contacts = await listContacts()

	const index = contacts.findIndex(contact => contact.id === contactId)

	if (index === -1) {
		return null
	}

	const removedContact = contacts[index]
	contacts.splice(index, 1)
	await writeContacts(contacts)

	return removedContact
}

async function addContact(name, email, phone) {
	const contacts = await listContacts()

	const newContact = { ...contact, id: crypto.randomUUID() }
	contacts.push(newContact)
	await writeContacts(contacts)

	return newContact
}

export default { listContacts, getContactById, removeContact, addContact }
