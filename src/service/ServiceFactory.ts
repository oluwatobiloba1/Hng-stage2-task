import Person from "../model/person";

export interface IPerson {
    name: string;
    _id: string;
}

type k = keyof IPerson;

export class ApiService {
//   private static instance: ServiceFactory;


  public async get(name: string): Promise<Record<string, string>|IPerson> {
    const person = await Person.findOne({name: name})
    if(!person) {
      return {message: "this person doesn't exist, would you like to create it?"};
  }
  return person as any;
  }
  // public async getBy(param: string): Promise<Record<string, string>|IPerson> {
  //   let value: IPerson | undefined;
  //   value = [].find((person) => person.name === param) || this.db.find((person) => person._id === param);
  //   if(!value) {
  //       return  {message: "this person doesn't exist, would you like to create it?"};
  //   }

  //   return value;
  // }

  public async create(data: IPerson): Promise<IPerson| Record<string, any>> {
    // let value: IPerson | undefined | null;
    const findPersonWithName = this.get(data.name)

    if((await findPersonWithName)._id) {
      return {message: 'Person already exists, would you like to update it?'};
    }
    else{
      const person = new Person(data);
      try {
        const newPerson = await person.save();
        return newPerson as any;
      } catch (error: any) {
        return {message: error.message}
      }
      // this.db.push({...data, _id: (this.db.length + 1).toString()})
      // return {...data, _id: this.db.length.toString()};

    }
  }


  public async update(data: IPerson, queryIdentifier: string){
    let findPersonWithName;
    let confirmNameUniquenss;
    try{
      const checkUser = await this.get(queryIdentifier);
      findPersonWithName = checkUser;   

      const checkUserName = await this.get(data.name);
      confirmNameUniquenss = checkUserName;
    }
    catch(error){
      console.log(error)
    }


    if(!findPersonWithName?._id) {
      return {message: 'Person does not exists, would you like to create it?'};
    }
    if(confirmNameUniquenss?._id) {
      return {message: 'A person with this name already exists, use a different name'};
    }
    else{
      try {
        const returnedUpdate = await Person.findOneAndUpdate({name: queryIdentifier}, data);
        return {_id: returnedUpdate?._id, name:data.name}
      } catch (error: any) {
        console.log(error)
        return {message: error.message}
      }
    }
  }

  public async delete(data: string){
    let findPersonWithName;
    try{
      const checkUser = await this.get(data);
      findPersonWithName = checkUser;   

    }
    catch(error){
      console.log(error)
    }

    if(!findPersonWithName?._id) {
      return;
    }
    else{
      try {
        await Person.deleteOne({name: data});
        return {_id: findPersonWithName?._id, name: findPersonWithName.name};
      } catch (error: any) {
        return {message: error.message}
      }
    }
  }

}