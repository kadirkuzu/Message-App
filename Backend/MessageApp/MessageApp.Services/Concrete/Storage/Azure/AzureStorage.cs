using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using MessageApp.Services.Abstract.Storage.Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace MessageApp.Services.Concrete.Storage.Azure; 

public class AzureStorage: IAzureStorage
{
    readonly BlobServiceClient _blobServiceClient;
    BlobContainerClient _blobContainerClient;

    public AzureStorage(IConfiguration configuration)
    {
        _blobServiceClient = new(configuration["Storage:Azure"]);
    }

    public async Task DeleteAsync(string container, string fileName)
    {
        _blobContainerClient = _blobServiceClient.GetBlobContainerClient(container);
        var blobClient = _blobContainerClient.GetBlobClient(fileName);
        await blobClient.DeleteAsync();
    }

    public List<string> GetFiles(string container)
    {
        _blobContainerClient = _blobServiceClient.GetBlobContainerClient(container);
        return _blobContainerClient.GetBlobs().Select(x => x.Name).ToList();
    }

    public bool HasFile(string container, string fileName)
    {
        _blobContainerClient = _blobServiceClient.GetBlobContainerClient(container);
        return _blobContainerClient.GetBlobs().Any(x => x.Name == fileName);
    }

    public async Task<List<(string fileName, string path)>> UploadAsync(string container, IFormFileCollection files)
    {
        _blobContainerClient = _blobServiceClient.GetBlobContainerClient(container);
        await _blobContainerClient.CreateIfNotExistsAsync();
        await _blobContainerClient.SetAccessPolicyAsync(PublicAccessType.BlobContainer);
        List<(string fileName, string path)> result = new();
        foreach (var file in files)
        {
            BlobClient blobClient = _blobContainerClient.GetBlobClient(file.Name);
            await blobClient.UploadAsync(file.OpenReadStream());
            result.Add((file.Name,Path.Combine(container,file.Name)));
        }
        return result;
    }
}
