using MessageApp.Dto.Message;

namespace MessageApp.Commands.Messages.AddMessage; 

public record AddMessageCommand() : IRequest<MessageDto>;
public class AddMessageCommandHandler : IRequestHandler<AddMessageCommand, MessageDto>
{
    public Task<MessageDto> Handle(AddMessageCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
