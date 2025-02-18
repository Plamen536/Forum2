import { ref, onValue, getDatabase } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';

import "./Admin.css";

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

    const makeAdmin = (userId) => {
        const db = getDatabase();
        const userRef = ref(db, `users/${userId}`);
        userRef.update({ role: "admin" })
            .then(() => {
                console.log("User role updated to admin:", userId);
            })
            .catch((error) => {
                console.error("Error updating user role:", error);
            });
    };

    const blockUser = (userId) => {
        const db = getDatabase();
        const userRef = ref(db, `users/${userId}`);
        userRef.update({ role: "blocked" })
            .then(() => {
                console.log("User blocked:", userId);
            })
            .catch((error) => {
                console.error("Error blocking the user:", error);
            });
    };

    return (
        <Box className="admin-dashboard" p={4} bgGradient="linear(to-r, teal.500, green.500)" color="white">
            <Heading as="h1" size="xl" mb={6}>Admin Dashboard</Heading>
            <Stack spacing={4}>
                {users.map((user) => (
                    <Box key={user.id} p={4} borderWidth={1} borderRadius="md" shadow="md" bg="white" color="black">
                        <Text><strong>ID:</strong> {user.id}</Text>
                        <Text><strong>Name:</strong> {user.firstName} {user.lastName}</Text> {/* Corrected user name */}
                        <Text><strong>Email:</strong> {user.email}</Text>
                        <Stack direction="row" spacing={4} mt={4}>
                            <Button onClick={() => makeAdmin(user.id)} bg="blue" colorScheme="blue" size="sm">Make Admin</Button>
                            <Button onClick={() => blockUser(user.id)} bg="blue" colorScheme="red" size="sm">Block User</Button>
                        </Stack>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}
