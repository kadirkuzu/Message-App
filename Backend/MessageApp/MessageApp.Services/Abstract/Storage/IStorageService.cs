namespace MessageApp.Services.Abstract.Storage;
public interface IStorageService: IStorage
{
    public string StorageName { get; }
}
