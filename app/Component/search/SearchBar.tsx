import { getMenuService } from '@/services/authServices';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import FoodCard from '../card/FoodCard';
import SearchModal from '../modal/SearchModal';

interface Props {
    searchModal: boolean;
    setSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
    position?: "top" | "bottom";
}

export default function SearchBar({ searchModal, setSearchModal, position = "bottom" }: Props) {

    const [searchQuery, setSearchQuery] = React.useState('');

    const { data: searchResult = [] } = useQuery({
        queryKey: ['searchResult', searchQuery],
        queryFn: () => getMenuService("All", {
            query: searchQuery,
        }),
        enabled: searchQuery.trim().length > 0,
    });

    const filteredSearrch = searchResult.filter((menu) =>
        menu.title.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    )
    return (
        <SearchModal
            visible={searchModal}
            position={position}
            onClose={() => {
                setSearchModal(false);
                setSearchQuery('')
            }}
        >
            <View style={styles.wrapper}>
                <View style={styles.searchRow}>
                    <Ionicons
                        name="search-outline"
                        size={20}
                        color="#6B7280"
                        style={styles.icon}
                    />

                    <TextInput
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Search food..."
                        style={styles.searchInput}
                        placeholderTextColor="#9CA3AF"
                    />
                </View>

                {/* SCROLLABLE CONTENT */}
                <FlatList
                    data={filteredSearrch}
                    keyExtractor={(item) => item.id?.toString()}
                    renderItem={({ item }) => (
                        <FoodCard {...item} />
                    )}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            Menu not found
                        </Text>
                    }
                    contentContainerStyle={{ paddingBottom: 120 }}
                />

            </View>

        </SearchModal >
    )

}

const styles = StyleSheet.create({
    searchInput: {
        borderRadius: 10,
        height: 48,
        fontSize: 15,
        paddingHorizontal: 12,
        // let the row/container handle spacing
        flex: 1,
    },
    wrapper: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        paddingTop: 60,
        maxHeight: '100%'
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
        backgroundColor: '#F8FAFC',
        padding: 5,
        borderRadius: 10,
    },
    icon: {
        marginHorizontal: 6,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#4B5563',
        paddingTop: 24,
    }
})