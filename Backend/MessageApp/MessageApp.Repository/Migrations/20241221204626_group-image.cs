using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MessageApp.Repository.Migrations
{
    /// <inheritdoc />
    public partial class groupimage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasImage",
                table: "Chats",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasImage",
                table: "Chats");
        }
    }
}
