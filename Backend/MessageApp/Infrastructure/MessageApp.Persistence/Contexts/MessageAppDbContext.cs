﻿using MessageApp.Domain.Entities;
using MessageApp.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;

namespace MessageApp.Persistence.Contexts
{
    public class MessageAppDbContext : DbContext
    {
        public MessageAppDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<FriendRequest> FriendRequests { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<User> Users { get; set; }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var datas = ChangeTracker.Entries<BaseEntity>();

            foreach (var data in datas) {
                _ = data.State switch
                {
                    EntityState.Added => data.Entity.CreatedDate = DateTime.UtcNow,
                    EntityState.Modified => data.Entity.UpdatedDate = DateTime.UtcNow,
                };
            }

            return await base.SaveChangesAsync(cancellationToken);
        }

    }
}