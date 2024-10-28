import { StyleSheet, Text, View,RefreshControl, SafeAreaView, ScrollView, } from 'react-native'
import React from 'react'
import CustomHeader from '../components/CustomHeader'

const Faq = ({navigation}) => {
  
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
          <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
    <View style={styles.headerView}>
      <CustomHeader title={'FAQ'}  onPress={()=>navigation?.toggleDrawer()}/>
    </View>

    </ScrollView>
   </SafeAreaView>
  )
}

export default Faq

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center'
  },
  headerView:{
    width:'90%',
    paddingTop:20,
  }
})