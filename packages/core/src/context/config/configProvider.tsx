/*
 * Copyright 2021 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";

type Direction = "rtl" | "ltr";

export interface ConfigContextState {
    direction: Direction;
    isLTR: boolean;
    isRTL: boolean;
}

const initialConfigState: ConfigContextState = {
    direction: "ltr",
    isLTR: false,
    isRTL: true,
};

// we can remove this guard once Blueprint depends on React 16
export const ConfigContext = React.createContext(initialConfigState);
export const useConfigContext = () => React.useContext(ConfigContext);

export interface ConfigProviderProps {
    /** The component subtree which will have access to this hotkeys context. */
    children: React.ReactChild;

    /** Optional props to customize components direction. */
    direction: Direction;
}

export const ConfigProvider = ({ children, ...configProvider }: ConfigProviderProps) => {
    const [state] = React.useState({ ...initialConfigState, ...configProvider });

    const isLTR = state.direction === "ltr";
    const isRTL = state.direction === "rtl";

    // Context value;
    const value = React.useMemo(
        () => ({
            ...state,
            isLTR,
            isRTL,
        }),
        [state, isLTR, isRTL],
    );

    return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};
