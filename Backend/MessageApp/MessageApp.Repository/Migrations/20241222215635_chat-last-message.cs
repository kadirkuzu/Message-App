using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MessageApp.Repository.Migrations
{
    /// <inheritdoc />
    public partial class chatlastmessage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chats_Messages_LastMessageId1",
                table: "Chats");

            migrationBuilder.DropIndex(
                name: "IX_Chats_LastMessageId1",
                table: "Chats");

            migrationBuilder.DropColumn(
                name: "LastMessageId1",
                table: "Chats");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "LastMessageId1",
                table: "Chats",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Chats_LastMessageId1",
                table: "Chats",
                column: "LastMessageId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Chats_Messages_LastMessageId1",
                table: "Chats",
                column: "LastMessageId1",
                principalTable: "Messages",
                principalColumn: "Id");
        }
    }
}
