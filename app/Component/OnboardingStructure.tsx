
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    ImageSourcePropType,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';

interface OnboardingStructureProps {
    title1: string;
    title2?: string;
    subText: string;
    position: number;
    imageUrl: ImageSourcePropType;
    resizeType?: 'cover' | 'contain' | 'stretch' | 'center';
    badgeTitle?: string;
    badgeSubtitle?: string;
}

const onboardingRoutes = [
    '/(onboarding)/stepOne',
    '/(onboarding)/stepTwo',
    '/(onboarding)/stepThree',
] as const;

export const OnboardingStructure: React.FC<
    OnboardingStructureProps
> = ({
    title1,
    title2,
    subText,
    position,
    imageUrl,
    resizeType = 'cover',
    badgeTitle,
    badgeSubtitle,
}) => {
        const { completeOnboarding } = useAuth();
        const { height, width } = useWindowDimensions();
        const [isFinishing, setIsFinishing] = useState(false);

        const heroHeight = height * 0.61;
        const compact = height < 750;
        const horizontalPadding = Math.max(24, width * 0.072);

        const finishOnboarding = async () => {
            if (isFinishing) return;

            setIsFinishing(true);

            try {
                await completeOnboarding();
                router.replace('/(tabs)');
            } catch (error) {
                console.error('Failed to complete onboarding:', error);
            } finally {
                setIsFinishing(false);
            }
        };

        const handleAction = () => {
            if (isFinishing) return;

            if (position === onboardingRoutes.length - 1) {
                void finishOnboarding();
                return;
            }

            const nextRoute = onboardingRoutes[position + 1];

            if (nextRoute) {
                router.push(nextRoute);
            }
        };

        return (
            <View style={styles.page}>
                {/* Hero image */}
                <View style={[styles.hero, { height: heroHeight }]}>
                    <Image
                        source={imageUrl}
                        resizeMode={resizeType}
                        style={styles.image}
                        accessibilityIgnoresInvertColors
                    />

                    {/* Header over the image */}
                    <View style={styles.topBar}>
                        <View style={styles.logoWrap}>
                            <View style={styles.logoIcon}>
                                <Ionicons
                                    name="bag-handle"
                                    size={15}
                                    color="#2D5A27"
                                />
                            </View>

                            <Text style={styles.brand}>RAMAT PICKUP</Text>
                        </View>

                        {position < onboardingRoutes.length - 1 && (
                            <Pressable
                                accessibilityRole="button"
                                onPress={() => void finishOnboarding()}
                                disabled={isFinishing}
                                hitSlop={10}
                                style={styles.skipButton}
                            >
                                <Text style={styles.skipText}>Skip</Text>
                            </Pressable>
                        )}
                    </View>

                    {/* Floating freshness badge */}
                    {badgeTitle && (
                        <View style={styles.badgeCard}>
                            <View style={styles.badgeIconWrap}>
                                <Ionicons
                                    name="time-outline"
                                    size={21}
                                    color="#FFFFFF"
                                />
                            </View>

                            <View style={styles.badgeTextWrap}>
                                <Text style={styles.badgeSubtitle}>
                                    {badgeSubtitle || 'Cooked fresh'}
                                </Text>

                                <Text style={styles.badgeTitle}>
                                    {badgeTitle}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Overlapping bottom content panel */}
                <View
                    style={[
                        styles.contentPanel,
                        {
                            top: heroHeight - 25,
                            paddingHorizontal: horizontalPadding,
                        },
                    ]}
                >
                    <ScrollView
                        style={styles.contentScroll}
                        contentContainerStyle={styles.contentInner}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                    >
                        {/* Progress indicator */}
                        <View
                            style={styles.progressRow}
                            accessibilityLabel={`Step ${position + 1} of 3`}
                        >
                            {onboardingRoutes.map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.progressTrack,
                                        index === position && styles.progressActive,
                                        index < position && styles.progressComplete,
                                    ]}
                                />
                            ))}

                            <Text style={styles.stepCount}>
                                {`${String(position + 1).padStart(2, '0')}/03`}
                            </Text>
                        </View>

                        {/* Heading */}
                        <Text
                            style={[
                                styles.title,
                                { fontSize: width < 360 ? 28 : 30 },
                            ]}
                        >
                            {title1}
                        </Text>

                        {title2 ? (
                            <Text
                                style={[
                                    styles.title,
                                    styles.titleHighlight,
                                    { fontSize: width < 360 ? 28 : 30 },
                                ]}
                            >
                                {title2}
                            </Text>
                        ) : null}

                        {/* Description */}
                        <Text style={styles.description}>
                            {subText}
                        </Text>
                        <Pressable
                            accessibilityRole="button"
                            accessibilityState={{
                                disabled: isFinishing,
                                busy: isFinishing,
                            }}
                            disabled={isFinishing}
                            onPress={handleAction}
                            // style={({ pressed }) => [
                            //   styles.primaryButton,
                            // ]}
                            style={[
                                styles.primaryButton,
                                isFinishing && styles.buttonDisabled,
                            ]}
                            className="active:opacity-90 shadow-lg"
                        >
                            <Text style={styles.primaryButtonText} className=''>
                                {position === onboardingRoutes.length - 1
                                    ? 'Get started'
                                    : 'Continue'}
                            </Text>

                            <View style={styles.arrowCircle}>
                                <Ionicons
                                    name="arrow-forward"
                                    size={21}
                                    color="#FFFFFF"
                                />
                            </View>
                        </Pressable>
                    </ScrollView>

                    {/* Continue button */}
                    {/* <View style={styles.actions} className='border-2 bg-red-500 rounded-xl shadow-inherit flex-row items-center justify-between p-2'>
        </View> */}
                </View>
            </View>
        );
    };

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#FDFBF7',
    },

    hero: {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#B8B09A',
    },

    image: {
        width: '100%',
        height: '100%',
    },

    topBar: {
        position: 'absolute',
        top: 40,
        left: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    logoWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9,
        paddingVertical: 7,
        paddingHorizontal: 8,
        paddingRight: 15,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.24)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.38)',
    },

    logoIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#FDFBF7',
        alignItems: 'center',
        justifyContent: 'center',
    },

    brand: {
        color: '#000000',
        fontFamily: 'poppinsBold',
        fontSize: 12,
        letterSpacing: 1,
    },

    skipButton: {
        minWidth: 70,
        height: 46,
        paddingHorizontal: 17,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.22)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.32)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    skipText: {
        color: '#000000',
        fontFamily: 'poppinsSemiBold',
        fontSize: 13,
    },

    badgeCard: {
        position: 'absolute',
        left: 20,
        bottom: 28,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(253,251,247,0.96)',
        borderRadius: 24,
        paddingVertical: 10,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingRight: 18,
        maxWidth: '85%',
        gap: 12,
        elevation: 5,
        shadowColor: '#000000',
        shadowOpacity: 0.12,
        shadowRadius: 9,
        shadowOffset: { width: 0, height: 4 },
    },

    badgeIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 16,
        backgroundColor: '#2D5A27',
        alignItems: 'center',
        justifyContent: 'center',
    },

    badgeTextWrap: {
        flexShrink: 1,
    },

    badgeSubtitle: {
        color: '#757872',
        fontFamily: 'poppinsRegular',
        fontSize: 12,
        lineHeight: 17,
    },

    badgeTitle: {
        color: '#202820',
        fontFamily: 'poppinsBold',
        fontSize: 14,
        lineHeight: 19,
    },

    contentPanel: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        marginBottom: 0,
        backgroundColor: '#FDFBF7',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 43,
        flex: 1,
    },

    contentScroll: {
        flex: 1,
    },

    contentInner: {
        flexGrow: 1,
    },

    progressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 17,
    },

    progressTrack: {
        flex: 1,
        height: 5,
        borderRadius: 10,
        backgroundColor: '#DFE1D9',
    },

    progressActive: {
        flex: 2.5,
        backgroundColor: '#2D5A27',
    },

    progressComplete: {
        backgroundColor: '#9CB998',
    },

    stepCount: {
        marginLeft: 6,
        color: '#757872',
        fontFamily: 'poppinsSemiBold',
        fontSize: 12,
        letterSpacing: 0.3,
    },

    title: {
        color: '#1D261D',
        fontFamily: 'poppinsBold',
        lineHeight: 36,
        letterSpacing: -0.9,
    },

    titleHighlight: {
        color: '#2D5A27',
    },

    description: {
        color: '#666D63',
        fontFamily: 'poppinsRegular',
        fontSize: 15,
        lineHeight: 23,
        marginTop: 10,
    },

    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 0,
    },

    primaryButton: {
        // flex: 1,
        // height: 20,
        borderRadius: 36,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 27,
        paddingVertical: 10,
        paddingRight: 8,
        marginTop: 8,
        elevation: 4,
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },

    // primaryButtonPressed: {
    //     opacity: 0.94,
    // },

    buttonDisabled: {
        opacity: 0.7,
    },

    primaryButtonText: {
        color: '#2D5A27',
        fontFamily: 'poppinsBold',
        fontSize: 15,
    },

    arrowCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#2D5A27',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
