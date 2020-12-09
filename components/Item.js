import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const Item = (props) => {
  let comum = '#1DAB34';
  let medio = '#FAA222';
  let importante = '#A93226';
  const changeCor = (e) => {
    switch (e) {
      case 0:
        return comum;
      case 1:
        return medio;
      case 2:
        return importante;
    }
  };
  return (
    <View style={styles.flexy}>
      <Text
        style={{maxWidth: '90%', color: '#fff', fontFamily: 'Poppins-Regular'}}>
        {props.texto}
      </Text>
      <TouchableOpacity
        style={{
          height: 20,
          width: 20,
          position: 'absolute',
          borderRadius: 5,
          backgroundColor: changeCor(props.cor),
          right: 30,
        }}
        onPress={props.changeCor}></TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 20,
          width: 20,
          position: 'absolute',
          right: 0,
        }}
        onPress={props.handleDelete}>
        <Image
          source={require('../assets/trash-can.png')}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  flexy: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '10%',
    justifyContent: 'flex-start',
    width: '80%',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderColor: '#D7DDE1',
  },
  block: {
    height: 20,
    width: 20,
    position: 'absolute',
    borderRadius: 20,
    right: 0,
  },
});
export default Item;
