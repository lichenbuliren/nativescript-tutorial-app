# Groceries

This branch contains the starting point for NativeScript’s [TypeScript & Angular 2 Getting Started Guide](http://docs.nativescript.org/angular/tutorial/ng-chapter-0). If you're looking for the completed state of the getting started guide, refer to [this repo's “angular-end” branch](https://github.com/NativeScript/sample-Groceries/tree/angular-end).

## 踩坑总结
1、安装 genymotion 的时候，如果遇到不能新增设备的时候，并提示403错误码，
这个很可能是因为网络问题，比如开着小飞机 shadowsocks 的时候。
2、如果 genymotion 和 虚拟机的版本不一致的时候，会导致 nativescript
命令行中的 livesync --watch 错误，无法编译通过，会报一个找不到 class 的错误。