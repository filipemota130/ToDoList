import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  LogBox,
} from 'react-native';
import axios from 'axios';
import Item from './Item';

class ToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskArray: [],
      loading: true,
      Texto: '',
      Level: 0,
      comum: '#1DAB34',
      medio: '#FAA222',
      importante: '#A93226',
    };
  }
  componentDidMount = () => {
    LogBox.ignoreLogs([
      ' Failed child context type: Invalid child context `virtualizedCell.cellKey` of type `number` supplied to `CellRenderer`, expected `string`',
    ]);
    var this2 = this;
    setInterval(function () {
      axios
        .get('https://todolist-295919.appspot.com/listItems')
        .then((res) => {
          this2.setState({
            taskArray: res.data.items,
            loading: false,
          });
        })
        .catch((e) => {
          console.log(JSON.stringify(e));
        });
    }, 2000);
  };

  Pressed = () => {
    if (this.state.Texto === '') {
      Alert.alert('Tarefa vazia', 'Adicione um conteúdo!');
    } else {
      const data = {
        key: Date.now().toString(),
        task: this.state.Texto,
        priority: this.state.Level,
      };
      this.setState({
        Texto: '',
        Level: 0,
        loading: true,
      });
      axios
        .post(
          `https://todolist-295919.appspot.com/addTodoItem?item=${data.task}&priority=${data.priority}&id=${data.key}`,
        )
        .then((res) => {
          this.setState({
            taskArray: res.data.items,
            loading: false,
          });
        })
        .catch((e) => {
          console.log(JSON.stringify(e));
        });
    }
  };

  handleDelete = (item) => {
    Alert.alert(
      'Deletar Tarefa',
      'Tem certeza?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            this.setState({
              taskArray: this.state.taskArray.filter((tasks) => tasks != item),
            }),
        },
      ],
      {cancelable: false},
    );
  };
  handleRendertask = ({item}) => (
    <Item
      texto={item.item}
      cor={item.priority}
      handleDelete={() => this.handleDelete(item)}></Item>
  );
  render() {
    if (!this.state.loading) {
      return (
        <SafeAreaView style={styles.fundo}>
          <StatusBar backgroundColor="#0E82D8" />
          <View style={[styles.flexy, styles.title]}>
            <Text style={styles.title_text}>
              TODO <Text style={styles.bold}>LIST</Text>
            </Text>
          </View>
          <View style={styles.InputView}>
            <TextInput
              style={styles.input}
              placeholder="Digite aqui"
              placeholderTextColor="#fff"
              onChangeText={(text) =>
                this.setState({
                  Texto: text,
                })
              }
              value={this.state.Texto}
            />
            <View>
              <TouchableOpacity onPress={this.Pressed} style={styles.btn}>
                <Text style={styles.add}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.title_select}>
            <Text style={{color: '#fff', fontFamily: 'Poppins-Regular'}}>
              Selecione o nivel de prioridade:
            </Text>
          </View>

          <View style={styles.btn_div}>
            <View style={styles.entri_btn}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 5,
                  borderRadius: 20,
                  borderWidth: 2,
                  fontFamily: 'Poppins-Regular',
                  borderColor: this.state.comum,
                }}
                onPress={() =>
                  this.setState({
                    Level: 0,
                  })
                }>
                <Text style={styles.text_btn}>Low</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.entri_btn}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 5,
                  borderRadius: 20,
                  borderWidth: 2,
                  fontFamily: 'Poppins-Regular',
                  borderColor: this.state.medio,
                }}
                onPress={() =>
                  this.setState({
                    Level: 1,
                  })
                }>
                <Text style={styles.text_btn}>Medium</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.entri_btn}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 5,
                  borderRadius: 20,
                  borderWidth: 2,
                  fontFamily: 'Poppins-Regular',
                  borderColor: this.state.importante,
                }}
                onPress={() =>
                  this.setState({
                    Level: 2,
                  })
                }>
                <Text style={styles.text_btn}>High</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={this.state.taskArray}
            key={(item) => item}
            renderItem={this.handleRendertask}
            style={{paddingBottom: 10}}
          />
        </SafeAreaView>
      );
    } else {
      return (
        <View style={styles.load}>
          <Text>Carregando...</Text>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  flexy: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  load: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_btn: {
    padding: 10,
    paddingBottom: 5,
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  InputView: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
  },
  btn_div: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
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
  title_select: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});

export default ToDo;
