using MessageApp.Services.Abstract.Storage;
using Microsoft.AspNetCore.Http;

namespace MessageApp.Services.Concrete.Storage;

internal class StorageService : IStorageService
{
    readonly IStorage _storage;

    public StorageService(IStorage storage)
    {
        _storage = storage;
    }

    public string StorageName => _storage.GetType().Name;

    public async Task DeleteAsync(string path, string fileName)
        => await _storage.DeleteAsync(path, fileName);

    public List<string> GetFiles(string path)
        => _storage.GetFiles(path);

    public bool HasFile(string path, string fileName)
        => _storage.HasFile(path, fileName);

    public async Task<List<(string fileName, string path)>> UploadAsync(string path, IFormFileCollection files)
        => await _storage.UploadAsync(path, files);
}
