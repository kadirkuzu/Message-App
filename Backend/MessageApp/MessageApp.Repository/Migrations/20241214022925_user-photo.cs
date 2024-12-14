﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MessageApp.Repository.Migrations
{
    /// <inheritdoc />
    public partial class userphoto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasPhoto",
                table: "AspNetUsers",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasPhoto",
                table: "AspNetUsers");
        }
    }
}
