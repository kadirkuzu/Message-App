using MessageApp.Application.Abstractions.Storage.Local;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace MessageApp.Infrastructure.Services.Storage.Local
{
    public class LocalStorage : ILocalstorage
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public LocalStorage(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task DeleteAsync(string path, string fileName)
            => File.Delete(Path.Combine(path,fileName));
        

        public List<string> GetFiles(string path)
        {
            DirectoryInfo directory = new(path);
            return directory.GetFiles().Select(x => x.Name).ToList();
        }

        public bool HasFile(string path, string fileName)
            => File.Exists(Path.Combine(path,fileName));
        

        public async Task<List<(string fileName, string path)>> UploadAsync(string path, IFormFileCollection files)
        {
            var uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, path);
            List<(string fileName, string path)> result = [];

            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }
            foreach (var file in files)
            {
                await CopyFileAsync(Path.Combine(uploadPath, file.Name), file);
                result.Add((file.Name, Path.Combine(uploadPath, file.Name)));
            }

            return result;
        }

        private async Task<bool> CopyFileAsync(string path, IFormFile file)
        {
            await using FileStream fileStream = new(path, FileMode.Create, FileAccess.Write, FileShare.None, 1024 * 1024, useAsync: false);
            await file.CopyToAsync(fileStream);
            await fileStream.FlushAsync();
            return true;
        }
    }
}
