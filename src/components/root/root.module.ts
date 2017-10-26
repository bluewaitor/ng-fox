import {ComponentFactoryResolver, ComponentRef, Inject, Injector, NgModule, OnDestroy} from '@angular/core';
import {RootStyleComponent} from './root-style.component';
import {DOCUMENT} from '@angular/platform-browser';

@NgModule({
    imports: [],
    exports: [RootStyleComponent],
    declarations: [RootStyleComponent],
    providers: [],
    entryComponents: [RootStyleComponent]
})
export class RootModule implements OnDestroy {

  private styleHostComponent: ComponentRef<RootStyleComponent>;

  constructor(@Inject(DOCUMENT) _document: Document, injector: Injector, resolver: ComponentFactoryResolver) {
    const componentFactory = resolver.resolveComponentFactory(RootStyleComponent);
    const div = _document.createElement('div');
    this.styleHostComponent = componentFactory.create(injector, null, div);
  }

  ngOnDestroy(): void {
    this.styleHostComponent.destroy();
  }
}
