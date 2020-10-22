import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import mapMarker from '../../images/marker.png'

import api from '../../services/api'

import styles from './style';
import { RectButton } from 'react-native-gesture-handler';

interface IOrphanageItem {
    id: number;
    name: string;
    latitude: number;
    longitude: number
}

const OrphanagesMap: React.FC = () => {

    const [orphanages, setOrphanages] = useState<IOrphanageItem[]>([])
    const navigation = useNavigation();

    useFocusEffect(() => {
        async function searchOpharnages() {
            const response = await api.get('/orphanages')

            setOrphanages(response.data)
        }

        searchOpharnages()
    })

    function handleNavigateToOrphanageDetails(id: number) {

        navigation.navigate('OrphanageDetails', { id })

    }

    function handleNavigateToCreateOrphanage() {

        navigation.navigate('SelectMapPositon')

    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: -21.2798039,
                    longitude: -48.3285181,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008
                }}
            >

                {orphanages.map(orphanage => (

                    <Marker
                        key={orphanage.id}
                        icon={mapMarker}
                        coordinate={{
                            latitude: orphanage.latitude,
                            longitude: orphanage.longitude,
                        }}
                        calloutAnchor={{
                            x: 2.7,
                            y: 0.8,
                        }}
                    >
                        <Callout
                            tooltip
                            onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}
                        >
                            <View style={styles.calloutContainer}>
                                <Text style={styles.calloutText}>{orphanage.name}</Text>
                            </View>
                        </Callout>
                    </Marker>

                ))}
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

                <RectButton
                    style={styles.createOrphanageButton}
                    onPress={handleNavigateToCreateOrphanage}
                >
                    <Feather name="plus" size={20} color="#FFF" />
                </RectButton>
            </View>

        </View >
    );
}

export default OrphanagesMap;