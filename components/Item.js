import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const Item = (props) => {
  return (
    <View style={styles.flexy}>
      <Text style={styles.inputText}>{props.texto}</Text>
      <TouchableOpacity
        style={{
          height: 20,
          width: 20,
          position: 'absolute',
          borderRadius: 20,
          backgroundColor: props.cor,
          right: 30,
        }}
        onPress={props.changeCor}></TouchableOpacity>
      <TouchableOpacity style={styles.btnDelete} onPress={props.handleDelete}>
        <Image source={require('../assets/trash.png')} style={styles.img} />
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
    borderBottomWidth: 1,
    borderColor: '#4D5656',
  },
  block: {
    height: 20,
    width: 20,
    position: 'absolute',
    borderRadius: 20,
    right: 0,
  },
  inputText: {
    maxWidth: '90%',
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  btnDelete: {
    height: 20,
    width: 20,
    position: 'absolute',
    right: 0,
  },
  img: {
    width: 20,
    height: 20,
  },
});
export default Item;
