import { program } from 'commander'
import Contacts from './contacts.js'

const options = program.opts()

async function invokeAction({ action, id, name, email, phone }) {
	try {
		switch (action) {
			case 'list':
				const contacts = await Contacts.listContacts()
				console.table(contacts)
				break

			case 'get':
				const contact = await Contacts.getContactById(id)
				console.log(contact)
				break

			case 'add':
				const addContact = await Contacts.addContact(name, email, phone)
				console.log(addContact)
				break

			case 'remove':
				const removedContact = await Contacts.removeContact(id)
				console.log(removedContact)
				break

			default:
				console.warn('\x1B[31m Unknown action type!')
		}
	} catch (error) {
		console.error(error)
	}
}

program
	.option('-a, --action <type>', 'choose action')
	.option('-i, --id <type>', 'user id')
	.option('-n, --name <type>', 'user name')
	.option('-e, --email <type>', 'user email')
	.option('-p, --phone <type>', 'user phone')

program.parse()

invokeAction(options)
