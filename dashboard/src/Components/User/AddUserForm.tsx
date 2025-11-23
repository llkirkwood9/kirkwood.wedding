import { useState } from "react";
import { Toast } from "../../Lib/Toast";
import Button from "../Elements/Button";

type Props = {
    onClose: () => void;
    onSave: (email: string, firstName: string, lastName: string) => void;
};

const AddUserForm = (props: Props) => {
    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !firstName || !lastName) {
            Toast.Warning("All fields are required.");
            return;
        }
        props.onSave(email, firstName, lastName);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <form
                className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg w-full max-w-md"
                onSubmit={handleSave}
            >
                <h2 className="text-lg font-semibold mb-4">Add New User</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg bg-zinc-50 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                            maxLength={100}
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">First Name</label>
                        <input
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg bg-zinc-50 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                            maxLength={100}
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Last Name</label>
                        <input
                            type="text"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg bg-zinc-50 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                            maxLength={100}
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                    <Button
                        onClick={props.onClose}
                        className="px-4 py-2 rounded-lg bg-zinc-700 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500"
                        text="Cancel"
                    />
                    <Button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                        text="Add"
                    />
                </div>
            </form>
        </div>
    );
};

export default AddUserForm;
