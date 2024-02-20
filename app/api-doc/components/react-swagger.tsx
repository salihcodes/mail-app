"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

type Props = {
  spec: Record<string, any>;
};

function ReactSwagger({ spec }: Props) {
  if (!spec) {
    return <div>Api docs not found</div>;
  }
  return <SwaggerUI spec={spec} />;
}

export default ReactSwagger;
