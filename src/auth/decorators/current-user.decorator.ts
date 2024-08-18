import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ICurrentUserPayload } from 'src/infrastructure/interfaces/current-user-payload.interface';

export const CurrentUser = createParamDecorator(
  (_data: never, context: ExecutionContext): ICurrentUserPayload => {
    const request = context.switchToHttp().getRequest();

    const currentUser: ICurrentUserPayload = request.user;

    return currentUser;
  },
);
