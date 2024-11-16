// AvatarProvider.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AvatarContext = createContext({});

export const avatarOptions = [
    { id: 1, image: require('../img/avatares/1.png') },
    { id: 2, image: require('../img/avatares/2.png') },
    { id: 3, image: require('../img/avatares/3.png') },
    { id: 4, image: require('../img/avatares/4.png') },
    { id: 5, image: require('../img/avatares/5.png') },
    { id: 6, image: require('../img/avatares/6.png') },
    { id: 7, image: require('../img/avatares/7.png') },
];

export function AvatarProvider({ children }) {
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const loadAvatar = async () => {
            try {
                const storedAvatarId = await AsyncStorage.getItem('selectedAvatarId');
                if (storedAvatarId) {
                    const avatarData = avatarOptions.find(item => item.id === parseInt(storedAvatarId, 10));
                    if (avatarData) {
                        setAvatar(avatarData.image);
                    }
                }
            } catch (error) {
                console.log("Erro ao carregar avatar:", error);
            }
        };
        loadAvatar();
    }, []);

    const updateAvatar = async (avatarId) => {
        try {
            const avatarData = avatarOptions.find(item => item.id === avatarId);
            if (avatarData) {
                setAvatar(avatarData.image);
                await AsyncStorage.setItem('selectedAvatarId', avatarId.toString());
            }
        } catch (error) {
            console.log("Erro ao salvar avatar:", error);
        }
    };

    return (
        <AvatarContext.Provider value={{ avatar, setAvatar: updateAvatar }}>
            {children}
        </AvatarContext.Provider>
    );
}

export const useAvatar = () => useContext(AvatarContext);


