## Structure

bakan uses a monorepo structure managed by Turborepo:

```
bakan/
├── apps/                        # Deployable applications
│   ├── web/                     # website
├── packages/                    # Shared packages
│   ├── typescript-config/       # typescript configuration
│   ├── ui/                      # components
│   └── ...
├── turbo/generators             # Generators for creating packages
└── ...
```

## License

MIT
