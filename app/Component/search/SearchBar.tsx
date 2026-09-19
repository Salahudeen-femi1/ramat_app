import { getMenuService, miniMarketService } from '@/services/authServices';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import FoodCard from '../card/FoodCard';
import MartCard from '../card/MartCard';
import SearchModal from '../modal/SearchModal';

interface Props {
    searchModal: boolean;
    setSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
    position?: "top" | "bottom";
    searchType?: 'food' | 'market';
    onSearchQueryChange?: (query: string) => void;
}

export default function SearchBar({
    searchModal,
    setSearchModal,
    position = "bottom",
    searchType = 'food',
    onSearchQueryChange,
}: Props) {

    const [searchQuery, setSearchQuery] = React.useState('');

    const { data: searchResult = [] } = useQuery({
        queryKey: ['searchResult', searchType, searchQuery],
        queryFn: async () => {
            if (searchType === 'market') {
                return miniMarketService({ query: searchQuery });
            }

            return getMenuService('All', { query: searchQuery });
        },
        enabled: searchQuery.trim().length > 0,
    });

    const filteredSearrch = searchResult.filter((item: any) => {
        const title = String(item?.title ?? item?.name ?? '').toLocaleLowerCase();
        return title.includes(searchQuery.toLocaleLowerCase());
    });

    return (
        <SearchModal
            visible={searchModal}
            position={position}
            onClose={() => {
                setSearchModal(false);
                setSearchQuery('');
                onSearchQueryChange?.('');
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
                        onChangeText={(text) => {
                            setSearchQuery(text);
                            onSearchQueryChange?.(text);
                        }}
                        placeholder={searchType === 'market' ? 'Search mart items...' : 'Search food...'}
                        style={styles.searchInput}
                        placeholderTextColor="#9CA3AF"
                    />
                </View>

                <FlatList
                    data={filteredSearrch}
                    keyExtractor={(item: any) => String(item.id ?? item.title ?? Math.random())}
                    renderItem={({ item }) => {
                        if (searchType === 'market') {
                            return <MartCard {...item} />;
                        }

                        return <FoodCard {...item} />;
                    }}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            {searchType === 'market' ? 'Mart item not found' : 'Menu not found'}
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