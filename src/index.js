import { program } from 'commander'
import Contacts from './contacts'

const options = program.opts()

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case 'list':
			const contacts = await Contacts.getListContacts()
			return contacts
			break

		case 'get':
			const contact = await Contacts.getContactById(id)
			return contact
			break

		case 'add':
			const addContact = await Contacts.addContact({ name, email, phone })
			return addContact
			break

		case 'remove':
			const removedContact = await Contacts.removeContact(id)
			return removedContact
			break

		default:
			console.warn('\x1B[31m Unknown action type!')
	}
}

program
	.option('-a, --action <type>', 'choose action')
	.option('-i, --id <type>', 'user id')
	.option('-n, --name <type>', 'user name')
	.option('-e, --email <type>', 'user email')
	.option('-p, --phone <type>', 'user phone')

program.parse(process.argv)

invokeAction(program.opts()).then(console.log).catch(console.error)
