import { useEffect, useState } from "react";
import Icon from "../Elements/Icon";
import AddUserForm from "./AddUserForm";
import Button from "../Elements/Button";
import { Toast } from "../../Lib/Toast";
import { AddUser, DeleteUser, GetUsers } from "../../Services/AuthServices";
import type { User } from "../../Models/User";
import ListSkeleton from "../Elements/ListSkeleton";
import ConfirmationModal from "../Elements/ConfirmationModal";

const UserList = () => {
    const [userSearch, setUserSearch] = useState<string>("");
    const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [deleteUserConfirmation, setDeleteUserConfirmation] = useState<boolean>(false);
    const [deleteUser, setDeleteUser] = useState<User | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        const users = await GetUsers();
        setUsers(users);
        setLoading(false);
    };

    const filteredUsers = users.filter(
        (u) =>
            `${u.firstName} ${u.lastName}`.toLowerCase().includes(userSearch.toLowerCase()) ||
            (u.email && u.email.toLowerCase().includes(userSearch.toLowerCase()))
    );

    const handleAddUser = async (email: string, firstName: string, lastName: string) => {
        setShowAddUserModal(false);

        setLoading(true);

        // Create new user data
        const newUser: User = {
            email: email,
            firstName: firstName,
            lastName: lastName,
        };

        // Send to API
        const result: boolean = await AddUser(newUser);

        if (result) {
            Toast.Success(`User ${email} added successfully.`);
        }

        // Re fetch users
        fetchUsers();

        setLoading(false);
    };

    const handleDeleteUser = async (toDelete: User) => {
        setLoading(true);

        // Create delete object
        const deleteData: User = {
            email: toDelete.email ?? "",
        };

        // Call API to delete user
        const success = await DeleteUser(deleteData);
        if (success) {
            Toast.Success(`User ${toDelete.email} deleted successfully.`);
        }

        // Re-fetch users
        fetchUsers();

        setLoading(false);
    };

    return (
        <div>
            <div className="flex items-center">
                <h2 className="flex text-xl font-semibold mb-4">Users</h2>
                <Button
                    onClick={() => setShowAddUserModal(true)}
                    icon="fa-solid fa-plus"
                    text="Add User"
                    className="mb-4 ml-auto bg-green-700 hover:bg-green-800"
                />
            </div>
            <input
                type="text"
                placeholder="Search users..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="mb-4 w-full px-4 py-2 border rounded-lg bg-zinc-50 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {loading ? (
                <ListSkeleton />
            ) : (
                <ul className="space-y-2">
                    {filteredUsers.map((u) => (
                        <li
                            key={u.email}
                            className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-700 flex flex-col sm:flex-row sm:justify-between sm:items-center"
                        >
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-300 dark:border-zinc-600 mr-4 flex-shrink-0">
                                    <div className="w-full h-full flex items-center justify-center bg-zinc-300 dark:bg-zinc-600 text-zinc-800 dark:text-zinc-200 font-bold">
                                        <Icon icon="fa-solid fa-user" />
                                    </div>
                                </div>
                                <div>
                                    <span className="font-medium">{u.email}</span>
                                    <div className="mt-1 mb-1 text-sm">
                                        {u.firstName} {u.lastName}
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    onClick={() => {
                                        setDeleteUser(u);
                                        setDeleteUserConfirmation(true);
                                    }}
                                    icon="fa-solid fa-trash"
                                    text="Delete"
                                    className="bg-red-700 hover:bg-red-800"
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {showAddUserModal && (
                <AddUserForm onClose={() => setShowAddUserModal(false)} onSave={handleAddUser} />
            )}

            {deleteUserConfirmation && deleteUser && (
                <ConfirmationModal
                    promptText={`Are you sure you want to delete user ${deleteUser.email}?`}
                    confirmText="Delete"
                    cancelText="Cancel"
                    onConfirm={() => {
                        handleDeleteUser(deleteUser);
                        setDeleteUserConfirmation(false);
                        setDeleteUser(null);
                    }}
                    onCancel={() => {
                        setDeleteUserConfirmation(false);
                        setDeleteUser(null);
                    }}
                    cancelButtonClassName="bg-zinc-600 hover:bg-zinc-700"
                    confirmButtonClassName="bg-red-700 hover:bg-red-800"
                />
            )}
        </div>
    );
};

export default UserList;
