## Structure

bakan uses a monorepo structure managed by Turborepo:

```
bakan/
├── apps/                        # Deployable applications
│   ├── web/                     # website
├── packages/                    # Shared packages
│   ├── typescript-config/       # typescript configuration
│   ├── ui/                      # components
│   ├── database/                # database drizzle orm
│   └── ...
├── turbo/generators             # Generators for creating packages
└── ...
```

## License

MIT
