import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface ConditionalRouteProps extends RouteProps {
    redirectTo: string,
    condition: boolean,
}

/**
 * ConditionalRoute component renders a Route conditionally based on props.
 * @param redirectTo - Path to redirect if condition is false.
 * @param condition - Boolean condition to determine rendering or redirection.
 * @param component - Component to render if condition is true.
 * @param rest - Additional RouteProps to pass to Route component.
 */
export const ConditionalRoute = ({redirectTo, condition, component, ...rest} : ConditionalRouteProps) => {
    const ComponentToRoute = component as React.ComponentType<any>
    
   return (
    <Route {...rest}
            render={ (rProps) => 
                condition ? ( // Render ComponentToRoute if condition is true
                    <ComponentToRoute {...rProps}/> 
                ) : ( // Redirect to redirectTo path if condition is false
                    <Redirect to={redirectTo} />
                )
            }
    />)
}

