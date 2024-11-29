using Microsoft.AspNetCore.Http;

namespace MessageApp.Services.Abstract.Storage;
public interface IStorage
{
    Task<List<(string fileName, string path)>> UploadAsync(string path, IFormFileCollection files);
    Task DeleteAsync(string path, string fileName);
    List<string> GetFiles(string path);
    bool HasFile(string path, string fileName);
}
