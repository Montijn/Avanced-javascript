import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

import { firstValueFrom } from "rxjs";
import { AuthService } from "../services/auth/auth.service";
import { HuishoudboekjeService } from "../services/huishoudboekje/huishoudboekje.service";

export const authGuard: CanActivateFn = async (route, state) => {
	const authService = inject(AuthService);
  const huishoudboekjeService = inject(HuishoudboekjeService);
  const router = inject(Router);
  const huishoudboekjeId = route.paramMap.get("id");

  if (!huishoudboekjeId) {
    await router.navigate(['/overview']);
    return false;
  }

  const user = await firstValueFrom(authService.$currentUser);

  if (!user) {
    await router.navigate(['/auth']);
    return false;
  }

  const huishoudboekje = await firstValueFrom(huishoudboekjeService.getHuishoudboekje(huishoudboekjeId));

  if (huishoudboekje.ownerId === user.uid || huishoudboekje.participants.includes(user.uid)) {
    return true;
  } else {
    await router.navigate(['/overview']);
    return false;
  }
  
};