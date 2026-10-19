import { useAuth } from '@/context/AuthContext'
import { usePadding } from '@/context/PaddingProvider'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileDetails = () => {

  const { user } = useAuth();
  const padding = usePadding();

  return (
    <SafeAreaView
      style={{
        padding: padding.screen
      }}
    >
      <View className="flex flex-col gap-6">
        <View className="bg-gray-200 p-4">
          <Text className="font-poppinsMedium text-[15px] text-black/70">Account Name</Text>
          <Text className="text-[20px] font-poppinsRegular text-black/70">
            {user?.first_name} {user?.last_name}
          </Text>
        </View>

        <View className="bg-gray-200 p-4">
          <Text className="font-poppinsMedium text-[15px] text-black/70">Email</Text>
          <Text className="text-[20px] font-poppinsRegular text-black/70">
            {user?.email}
          </Text>
        </View>

        <View className="bg-gray-200 p-4">
          <Text className="font-poppinsMedium text-[15px] text-black/70">Phone Number</Text>
          <Text className="text-[20px] font-poppinsRegular text-black/70">
            {user?.phone}
          </Text>
        </View>

        <View className="bg-gray-200 p-4">
          <Text className="font-poppinsMedium text-[15px] text-black/70">Gender</Text>
          <Text className="text-[20px] font-poppinsRegular text-black/70">
            {user?.gender}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ProfileDetails