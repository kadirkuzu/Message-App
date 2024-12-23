using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MessageApp.Repository.Migrations
{
    /// <inheritdoc />
    public partial class chatlastmessage2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastMessageId",
                table: "Chats");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "LastMessageId",
                table: "Chats",
                type: "uuid",
                nullable: true);
        }
    }
}
