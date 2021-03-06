import { ApolloServer,gql} from "apollo-server";
import typeDefs from "../../src/typeDefs"
import resolvers from "../../src/resolvers"
import TaskController from "../../src/controller/task";
import ListController from "../../src/controller/list";

describe("Resolver Tests Suites", () => {

  it('Should get List success', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers
    });
    const GET_LIST = gql`
      query GetList {
        lists {
          id
          title
          tasks {
            id
            title
            status
          }
          }
        }
      `;

    ListController.getList = jest.fn(() => Promise.resolve(
      [{
        id: 57, title: 'List1', tasks: [{
          id: 1, title: 'task1', status: 'DOING'
        }] }] 
    ));
  
    const res = await server.executeOperation({ query: GET_LIST, variables: {} });
    expect(res.data).toEqual({lists:[{
      id: 57, title: 'List1', tasks: [{
        id: 1, title: 'task1', status: 'DOING'
      }] }]});
  });

  it('Should create List success', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers
    });
    const CREATE_LIST = gql`
      mutation CreateList {
        createList(title:"test1"){
          title
          id
        }
      }
    `;

    ListController.createList = jest.fn(() => Promise.resolve(
      {
        id: 57, title: 'List1'
      }
    ));
  
    const res = await server.executeOperation({ query: CREATE_LIST, variables: {} });
    expect(res.data).toEqual({createList :{title:'List1',id:57}});
  });

  it('Should throw error when create List without tittle', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers
    });
    const CREATE_LIST = gql`
        mutation CreateList {
      createList{
        title
        id
      }
    }
  `;

    ListController.createList = jest.fn(() => Promise.resolve(
      {
        id: 57, title: 'List1'
      }
    ));
    const res = await server.executeOperation({ query: CREATE_LIST, variables: {} });
    expect(res.errors).toBeDefined();
      


  });

  it('Should create Task success', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers
    });
    const CREATE_TASK = gql`
mutation createTask {
  createTask(title:"name7",listId:3){
    title
  }
}
    `;

    TaskController.createTask = jest.fn(() => Promise.resolve(
      {
        id: 57, title: 'List1'
      }
    ));
  
    const res = await server.executeOperation({ query: CREATE_TASK, variables: {} });
    expect(res.data).toEqual({createTask :{title:'List1'}});
  });

  it('Should update Task success', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers
    });
    const UPDATE_TASK = gql`
      mutation updateTask {
        updateTask(id:20,status:"DOING"){
          title
          status
        }
      }
    `;

    TaskController.updateTask = jest.fn(() => Promise.resolve(
      {
        id: 57, title: 'List1', status: 'DOING'
      }
    ));
  
    const res = await server.executeOperation({ query: UPDATE_TASK, variables: {} });
    expect(res.data).toEqual({updateTask :{title:'List1',status:"DOING"}});
  });

  it('Should move Task success', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers
    });
    const MOVE_TASK = gql`
      mutation moveTask {
        moveTask(id:22,beforeId:20,afterId:19){
          title
        }
      }
    `;

    TaskController.moveTask = jest.fn(() => Promise.resolve(
      {
        id: 57, title: 'List1'
      }
    ));
  
    const res = await server.executeOperation({ query: MOVE_TASK, variables: {} });
    expect(res.data).toEqual({moveTask :{title:'List1'}});
  });
});