abstract class Entity{
    protected constructor(public readonly id:string){
    }
}

class Userentity extends Entity{
    private _passwordHash: string;
    constructor(id:string, public username:string, passwordHash:string){
        super(id);
        this._passwordHash = passwordHash;
        this.username = username;
    }   
    get password():string{
        return this._passwordHash;
    }
}

//generic 
interface IRepository<T>{
    getById(id:string):T | undefined,
    save(item:T): void;
}

class IMemoryRepository<T extends Entity> implements IRepository<T>{
    private db: Map<string, T>= new Map();

    getById(id: string): T | undefined {
        return this.db.get(id);
    }

    save(item: T):void{
        this.db.set(item.id, item)
    }
}

function LogExecution(target: any, propertyKey: string, 
    descriptor: PropertyDescriptor){
        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]){
            console.log('Method: ${propertyKey} arguments: ', args);
            return originalMethod.apply(this, args);
        }
}

class TaskService{
    @LogExecution
    executeTask(taskId: string){
        console.log("Running: ${taskId}");
    }
}


// ЛАБА
class NoteEntity extends Entity{
    private _encryptedContent: string;
    constructor(id: string, public title:string, encryptedContent:string){
        super(id);
        this.title = title;
        this._encryptedContent = encryptedContent;
    }
    get content():string{
        return this._encryptedContent;
    }
}