import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, tap } from 'rxjs/operators';
import { deepCopy } from './helpers/deep-copy';
import { DeepReadonly } from './helpers/deep-readonly.model';
import { immutableDeepFreeze } from './helpers/immutable-deep-freeze';

export abstract class StoreBase<T> {
  private readonly _store$ = new BehaviorSubject<T>(this.createDefaultStore());
  public readonly store$: Observable<DeepReadonly<T>> = this._store$.asObservable().pipe(
    distinctUntilChanged(),
    map((store) => immutableDeepFreeze(store)),
    tap(console.log),
    shareReplay(1)
  );

  public get store(): DeepReadonly<T> {
    return immutableDeepFreeze(this._store$.getValue());
  }

  public reset(): void {
    this.setStore(this.createDefaultStore());
  }

  public update(props: Partial<T>): void {
    this.setStore(this.deepCopyStore({ ...(this.store as T), ...props }));
  }

  protected createDefaultStore(): T {
    return null;
  }

  protected deepCopyStore(store: T): T {
    return deepCopy(store);
  }

  private setStore(value: T): void {
    this._store$.next(value);
  }
}
