import { makeDomainFunction } from "domain-functions";
import { prisma } from "~/db.server";

import * as z from "zod";

const getStepsFromRoute = makeDomainFunction(z.string())(async (id) => {
  const steps = await prisma.routeSteps.findMany({ where: { routeId: id } });
  const clavesIds = steps.map((s) => s.claveId);
  const claves = await prisma.clave.findMany({
    where: { id: { in: clavesIds } },
  });
  const paths = claves.map((c) => [c.latitude, c.longitude]);
  return { claves, paths };
});

export { getStepsFromRoute };
