import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
  TouchableWithoutFeedback,
  AsyncStorage,
  Alert,
} from 'react-native';

import Item from './Item';

const ToDo = () => {
  let comum = '#1DAB34';
  let medio = '#FAA222';
  let importante = '#A93226';
  const [taskArray, updateTasks] = useState([]);
  const [Texto, updateText] = useState('');
  const [Level, updateLevel] = useState(comum);
  const data = {
    key: Texto,
    task: Texto,
    priority: Level,
  };
  const Pressed = () => {
    if (Texto === '') {
      Alert.alert('Tarefa vazia', 'Adicione um conteúdo!');
    } else {
      const data = {
        id: Texto,
        task: Texto,
        priority: Level,
      };
      updateTasks([...taskArray, data]);
      updateText('');
      updateLevel(comum);
    }
  };
  const handleDelete = (item) => {
    Alert.alert(
      'Deletar Tarefa',
      'Tem certeza?',
      [
        {
          text: 'Cancelar',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            updateTasks(taskArray.filter((tasks) => tasks != item)),
        },
      ],
      {cancelable: false},
    );
  };
  const changeCor = () => {
    switch (data.priority) {
      case comum:
        alert('mudando para atenção');
        data.priority = medio; //(TODO) pesquisar como se altera o valor após a criação
        break;
      case medio:
        alert('mudando para importante');
        data.priority = importante; //(TODO) pesquisar como se altera o valor após a criação
        break;
      case importante:
        alert('mudando para comum');
        data.priority = comum; //(TODO) pesquisar como se altera o valor após a criação
        break;
    }
  };
  const handleRendertask = ({item}) => (
    <Item
      texto={item.task}
      cor={item.priority}
      handleDelete={() => handleDelete(item)}
      changeCor={changeCor}></Item>
  );
  useEffect(() => {
    async function carregaDados() {
      const taskArray = await AsyncStorage.getItem('taskArray');

      if (taskArray) {
        updateTasks(JSON.parse(taskArray));
      }
    }
    carregaDados();
  }, []);

  useEffect(() => {
    async function salvaDados() {
      AsyncStorage.setItem('taskArray', JSON.stringify(taskArray));
    }
    salvaDados();
  }, [taskArray]);
  return (
    <SafeAreaView style={styles.fundo}>
      <StatusBar backgroundColor="#0E82D8" />
      <View style={[styles.flexy, styles.title]}>
        <Text style={styles.title_text}>
          TODO <Text style={styles.bold}>LIST</Text>
        </Text>
      </View>
      <View style={styles.info_aling}>
        <Text style={styles.info}>Selecione o nivel de prioridade:</Text>
      </View>

      <View style={styles.priority_view}>
        <View style={styles.entri_btn}>
          <TouchableOpacity
            style={[styles.btnFormat, {borderColor: comum}]}
            onPress={() => updateLevel(comum)}>
            <Text style={styles.btn_text}>Comum</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.entri_btn}>
          <TouchableOpacity
            style={[styles.btnFormat, {borderColor: medio}]}
            onPress={() => updateLevel(medio)}>
            <Text style={styles.btn_text}>Atento</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.entri_btn}>
          <TouchableOpacity
            style={[styles.btnFormat, {borderColor: importante}]}
            onPress={() => updateLevel(importante)}>
            <Text style={styles.btn_text}>importante</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.InputView}>
        <TextInput
          style={styles.input}
          placeholder="Digite aqui"
          placeholderTextColor="#fff"
          onChangeText={(text) => updateText(text)}
          value={Texto}
        />
        <View>
          <TouchableOpacity onPress={Pressed} style={styles.btn}>
            <Text style={styles.add}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={taskArray}
        key={(item) => item}
        renderItem={handleRendertask}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  flexy: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  InputView: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
  },
  title: {
    padding: 30,
    backgroundColor: '#0E82D8',
  },
  title_text: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  bold: {
    fontFamily: 'Poppins-Bold',
  },
  btn: {
    borderRadius: 20,
    width: 35,
    height: 35,
    borderWidth: 1,
    borderColor: '#32A3DF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2,
  },
  add: {
    color: '#32A3DF',
    fontSize: 24,
  },
  input: {
    borderBottomWidth: 2,
    padding: -2,
    borderRadius: 5,
    borderColor: '#32A3DF',
    height: 'auto',
    width: '80%',
    paddingHorizontal: 10,
    marginRight: 20,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
  },
  fundo: {
    height: '100%',
    backgroundColor: '#2C2D2C',
  },
  entri_btn: {
    paddingHorizontal: 2.5,
  },
  info: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  info_aling: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingTop: 30,
  },
  priority_view: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  btnFormat: {
    paddingHorizontal: 5,
    borderRadius: 20,
    borderWidth: 2,
    fontFamily: 'Poppins-Regular',
  },
  btn_text: {
    padding: 10,
    paddingBottom: 5,
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
});

export default ToDo;
