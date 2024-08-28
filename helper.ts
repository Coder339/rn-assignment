//
// DO Not modify this file.
//
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastMessage } from './src/components/toastMessage';
import { Dispatch, SetStateAction } from 'react';

type TodoItem = {
	id: string;
	title: string;
	done: boolean;
};

export async function getTodoItems(
	page: number,
	limit: number,
): Promise<TodoItem[]> {
	await wait(200);
	//   Throw random error
	// if (Math.random() < 0.2) {
	// 	// throw new Error('Random error');
	// 	ToastMessage('Something went wrong please try again.')
	// }
	const todoItems = JSON.parse(
		(await AsyncStorage.getItem('todoItems')) || '[]',
	);
	return todoItems.slice(page * limit, (page + 1) * limit) as TodoItem[];
}

export async function addTodoItem(title: string, setLoading: Dispatch<SetStateAction<boolean>>) {
	if (title.length < 3) {
		// throw new Error('Title must be at least 3 characters long');
		ToastMessage('Title must be at least 3 characters long')
		setLoading(false)
		return
	}
	await wait(1000);
	//   Throw random error
	// if (Math.random() < 0.2) {
	// 	// throw new Error('Random error');
	// 	ToastMessage('Something went wrong please try again.')
	// 	setLoading(false)
	// 	return
	// }
	const todoItems = JSON.parse(
		(await AsyncStorage.getItem('todoItems')) || '[]',
	);
	todoItems.unshift({
		id: Math.random().toString(36).substr(2, 9),
		title,
		done: false,
	});
	setLoading(false)
	await AsyncStorage.setItem('todoItems', JSON.stringify(todoItems));
}

export async function updateTodoItem(todoItem: TodoItem, setLoading: Dispatch<SetStateAction<boolean>>) {
	await wait(500);
	//   Throw random error
	// if (Math.random() < 0.2) {
	// 	throw new Error('Random error');
	// }
	const todoItems = JSON.parse(
		(await AsyncStorage.getItem('todoItems')) || '[]',
	);

	console.log(todoItems.length);

	const index = todoItems.findIndex(
		(item: TodoItem) => item.id === todoItem.id,
	);
	todoItems[index] = todoItem;
	setLoading(false)
	await AsyncStorage.setItem('todoItems', JSON.stringify(todoItems));
	return todoItems
}

export async function deleteTodoItem(id: string, setLoading: Dispatch<SetStateAction<boolean>>) {
	await wait(500);
	//   Throw random error
	// if (Math.random() < 0.2) {
	// 	// throw new Error('Random error');
	// 	ToastMessage('Something went wrong please try again.')
	// 	setLoading(false)
	// 	return
	// }
	const todoItems = JSON.parse(
		(await AsyncStorage.getItem('todoItems')) || '[]',
	);
	const index = todoItems.findIndex((item: TodoItem) => item.id === id);
	todoItems.splice(index, 1);
	setLoading(false)

	await AsyncStorage.setItem('todoItems', JSON.stringify(todoItems));

	return todoItems
}

export async function wait(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
