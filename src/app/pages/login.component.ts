import { ChangeDetectorRef, Component } from '@angular/core';

import { BaseComponent, BaseDependencies } from '../base/base.component';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent extends BaseComponent {
    constructor(dependencies: BaseDependencies, cdr: ChangeDetectorRef) {
        super(dependencies, cdr);
    }
}
