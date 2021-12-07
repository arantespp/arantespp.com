import * as React from 'react';

import { ApiKeyContext } from '../providers/ApiKey';

export const useApiKey = () => React.useContext(ApiKeyContext);
