import { ref, onValue, getDatabase, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";

export default function Admin() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const usersRef = ref(db, "users");

        onValue(usersRef, (snapshot) => {
            const usersData = snapshot.val();
            if (usersData) {
                const userList = Object.entries(usersData).map(([id, user]) => ({
                    id,
                    ...user,
                }));
                setUsers(userList);
            } else {
                setUsers([]);
            }
        });
    }, []);

    const updateUserRole = async (userId, role) => {
        const db = getDatabase();
        const userRef = ref(db, `users/${userId}`);

        await update(userRef, { role })
            .then(() => {
                console.log(`User role updated to ${role}:`, userId);
            })
            .catch((error) => {
                console.error(`Error updating user role to ${role}:`, error);
            });
    };

    return (
        <Box className="admin-dashboard" p={4} color="white">
            <Heading as="h1" size="xl" mb={6}>
                Admin Dashboard
            </Heading>
            <Stack spacing={4}>
                {users.map((user) => (
                    <Box key={user.id} p={4} borderWidth={1} borderRadius="md" shadow="md" bg="#f4f4f4 " color="black">
                        <Text>
                            <strong>ID:</strong> {user.handle}
                        </Text>
                        <Text>
                            <strong>Name:</strong> {user.firstName} {user.lastName}
                        </Text>
                        <Text>
                            <strong>Email:</strong> {user.email}
                        </Text>
                        <Stack direction="row" spacing={4} mt={4}>
                            {user.role === "admin" ? (
                                <Button onClick={() => updateUserRole(user.id, "user")} bg="red.500" colorScheme="red" size="sm">
                                    Remove Admin Status
                                </Button>
                            ) : user.role === "user" ? (
                                <>
                                    <Button onClick={() => updateUserRole(user.id, "admin")} bg="blue.500" colorScheme="blue" size="sm">
                                        Make Admin
                                    </Button>
                                    <Button onClick={() => updateUserRole(user.id, "blocked")} bg="red.500" colorScheme="red" size="sm">
                                        Block User
                                    </Button>
                                </>
                            ) : user.role === "blocked" ? (
                                <Button onClick={() => updateUserRole(user.id, "user")} bg="green.500" colorScheme="green" size="sm">
                                    Unblock User
                                </Button>
                            ) : null}
                        </Stack>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}
