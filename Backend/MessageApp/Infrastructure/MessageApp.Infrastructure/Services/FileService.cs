using MessageApp.Application.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace MessageApp.Infrastructure.Services;

public class FileService: IFileService
{
    private readonly IWebHostEnvironment _webHostEnvironment;

    public FileService(IWebHostEnvironment webHostEnvironment)
    {
        _webHostEnvironment = webHostEnvironment;
    }

    public async Task<List<(string fileName, string path)>>  UploadAsync(string path, IFormFileCollection files)
    {
        var uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, path);
        List<(string fileName, string path)> result = [];
            
        if (!Directory.Exists(uploadPath))
        {
            Directory.CreateDirectory(uploadPath);
        }
        foreach (var file in files)
        {
            var name = await FileRenameAsync(file.FileName);
            await CopyFileAsync(Path.Combine(uploadPath, name),file);
            result.Add((name,Path.Combine(uploadPath, name)));
        }

        return result;
    }

    public Task<string> FileRenameAsync(string fileName)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> CopyFileAsync(string path, IFormFile file)
    {
        await using FileStream fileStream = new (path, FileMode.Create,FileAccess.Write,FileShare.None,1024*1024,useAsync:false);
        await file.CopyToAsync(fileStream);
        await fileStream.FlushAsync();
        return true;
    }
}