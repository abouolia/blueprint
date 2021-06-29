/*
 * Copyright 2018 Palantir Technologies, Inc. All rights reserved.
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

import classNames from "classnames";
import * as React from "react";
import { NavbarElementProps } from "react-day-picker";

import { Button, AbstractPureComponent2 } from "@blueprintjs/core";

import * as Classes from "./common/classes";
import { areSameMonth } from "./common/dateUtils";

export interface IDatePickerNavbarProps extends NavbarElementProps {
    maxDate: Date;
    minDate: Date;

    hideLeftNavButton?: boolean;
    hideRightNavButton?: boolean;
}

export class DatePickerNavbar extends AbstractPureComponent2<IDatePickerNavbarProps> {
    public render() {
        const { classNames: classes, month, maxDate, minDate } = this.props;
        const { isLTR } = this.context;

        const leftBtnIcon = isLTR ? "chevron-left" : "chevron-right";
        const rightBtnIcon = isLTR ? "chevron-right" : "chevron-left";

        return (
            <div className={classNames(Classes.DATEPICKER_NAVBAR, classes.navBar)}>
                {this.props.hideLeftNavButton || (
                    <Button
                        className={classes.navButtonPrev}
                        disabled={areSameMonth(month, minDate)}
                        icon={leftBtnIcon}
                        minimal={true}
                        onClick={this.handlePreviousClick}
                    />
                )}
                {this.props.hideRightNavButton || (
                    <Button
                        className={classes.navButtonNext}
                        disabled={areSameMonth(month, maxDate)}
                        icon={rightBtnIcon}
                        minimal={true}
                        onClick={this.handleNextClick}
                    />
                )}
            </div>
        );
    }

    private handleNextClick = () => this.props.onNextClick();

    private handlePreviousClick = () => this.props.onPreviousClick();
}
