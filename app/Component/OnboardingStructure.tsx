import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import ActionButton from './button/ActionButton';

interface OnboardingStructureProps {
    title1: string;
    title2: string;
    subText: string;
    position: number;
    imageUrl: ImageSourcePropType;
    resizeType?: "cover" | "contain" | "stretch" | "center";
}

export const OnboardingStructure: React.FC<OnboardingStructureProps> = ({
    title1,
    title2,
    subText,
    position,
    imageUrl,
    resizeType
}) => {

    const onboardingNavigations: { path: any }[] = [
        { path: "/(onboarding)/stepOne" },
        { path: "/(onboarding)/stepTwo" },
        { path: "/(onboarding)/stepThree" },
        { path: "/(auth)/register" }
    ];

    const handleAction = () => {
        if (position === 2) {
            // await completeOnboarding();
            router.replace("/(auth)/register");
            return;
        }
        const nextRoute = onboardingNavigations[position + 1]?.path;
        if (nextRoute) {
            router.push(nextRoute);
        }
    };

    const handleSkip = () => {
        // await completeOnboarding();
        router.replace("/(auth)/register");
    };

    return (
        <View>
            <Image
                source={imageUrl}
                resizeMode={resizeType || "cover"}
                className="w-full h-[200px] rounded-t-[20px]"
            />

            <View>
                <View
                    className="flex-row"
                    style={{
                        justifyContent: "flex-end",
                        gap: 6,
                        marginBottom: 20,
                    }}
                >
                    {onboardingNavigations.slice(0, 3).map(({ path }, i) => (
                        <TouchableOpacity
                            key={i}
                            activeOpacity={0.7}
                            onPress={() => {
                                if (i !== position) {
                                    router.push(path);
                                }
                            }}
                            style={[
                                styles.pageTabs,
                                i === position && styles.pageTabsActive,
                                {
                                    paddingVertical: 4,
                                }
                            ]}
                        />
                    ))}
                </View>

                <Text
                    style={{
                        fontFamily: "quickSemiBold",
                        fontSize: 32,
                    }}
                >
                    {title1}
                </Text>
                <Text
                    style={{
                        fontFamily: "quickSemiBold",
                        fontSize: 32,
                    }}
                >
                    {title2}
                </Text>
                <Text style={{ fontSize: 16, marginTop: 10 }}>{subText}</Text>
            </View>

            {/* Bottom Section: Navigation Buttons */}
            <View className="flex-col gap-2" style={{ marginBottom: 15 }}>
                <ActionButton
                    name={position === 2 ? "Get Started" : "Next"}
                    action={handleAction}
                />
                {position < 2 && (
                    <ActionButton name="Skip" hasBG={false} action={handleSkip} />
                )}
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    pageTabs: {
        height: 8,
        width: 50,
        backgroundColor: "#E8EFEA",
        borderRadius: 20,
    },
    pageTabsActive: {
        backgroundColor: "#154A22"
    }
});