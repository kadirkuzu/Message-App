using FluentValidation;
using MessageApp.Domain.Entities;

namespace MessageApp.Application.Validators.Messages;

public class SendMessageValidator : AbstractValidator<Message>
{
    public SendMessageValidator()
    {
        RuleFor(c => c.Content)
            .NotEmpty()
            .NotNull()
            .WithMessage("Message content cannot be empty");
    }
}